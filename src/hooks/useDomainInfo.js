import { useContractRead } from 'wagmi';
import { useMemo } from 'react';
import { NameWrapper } from '../config/ABI';
import { NameWrapperContract } from '../config/contract';
import { ensHashName } from '../utils';
import moment from 'moment';

const useDomainInfo = (name) => {
	const { data: ensData } = useContractRead({
		abi: NameWrapper,
		address: NameWrapperContract,
		functionName: 'getData',
		args: [ensHashName(name)],
	});

	// const isNoRegister = useMemo(() => ensData)

	const expiration = useMemo(
		() =>
			!ensData?.expiry?.toNumber()
				? ''
				: moment((ensData?.expiry?.toNumber() ?? 0) * 1000).format(
						'YYYY-MM-DD HH:mm'
				  ),
		[ensData]
	);

	const days = useMemo(
		() =>
			moment((ensData?.expiry?.toNumber() ?? 0) * 1000).diff(moment(), 'days'),
		[ensData]
	);

	return { expiration, days };
};

export default useDomainInfo;
