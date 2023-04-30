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

	const getNames = useCallback(async () => {
		if (address) {
			// all , resolvedAddress, owner, wrappedOwner
			const res = await ENSInstance.getNames({
				address: address,
				type: 'all',
			});
			return res;
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
				getNames,
			}}
		>
			{children}
		</EnsjsContent.Provider>
	);
};

export const useENSJS = () => useContext(EnsjsContent);

export default EnsjsProdiver;
