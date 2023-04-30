import { ENS } from '@ensdomains/ensjs';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { createContext, useContext } from 'react';
import { useAccount, useProvider } from 'wagmi';
const ENSInstanceDefault = new ENS();
const EnsjsContent = createContext();

const EnsjsProdiver = ({ children }) => {
	const provider = useProvider();
	const { address } = useAccount();
	const [ENSInstance, setENSInstance] = useState(null);
	const [childrenList, setChildrenList] = useState([]);
	const [fatherList, setFatherList] = useState([]);

	const getNames = useCallback(async () => {
		if (address) {
			// all , resolvedAddress, owner, wrappedOwner
			try {
				const res = await ENSInstance.getNames({
					address: address,
					type: 'all',
				});

				res.forEach((item) => {
					if (item.type === 'wrappedDomain') {
						if (item.parent?.name === 'eth') {
							setFatherList((v) => [...v, item]);
						} else if (item.parent?.name.match('.eth')) {
							setChildrenList((v) => [...v, item]);
						}
					}
				});
			} catch (error) {}
		}
	}, [address, ENSInstance]);

	const ensSetProvider = useCallback(async () => {
		try {
			await ENSInstanceDefault.setProvider(provider);
			setENSInstance(ENSInstanceDefault);
		} catch (error) {}
	}, [provider]);

	useEffect(() => {
		ensSetProvider();
	}, [ensSetProvider]);

	return (
		<EnsjsContent.Provider
			value={{
				ENSInstance,
				setENSInstance: ensSetProvider,
				getNames,
				fatherList,
				childrenList,
			}}
		>
			{children}
		</EnsjsContent.Provider>
	);
};

export const useENSJS = () => useContext(EnsjsContent);

export default EnsjsProdiver;
