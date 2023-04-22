import { useCallback, useMemo, useState } from 'react';
import {
	useContractReads,
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
	erc20ABI,
	useAccount,
} from 'wagmi';
import reflectContract from '../config/contract';

const num =
	'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const useApprove = (tokenAddress = [], spenderAddress = reflectContract) => {
	const { address } = useAccount();
	const [isApprove, setIsApprove] = useState(false);

	const contracts = useMemo(() => {
		return tokenAddress.map((item) => {
			return {
				address: item,
				abi: erc20ABI,
				functionName: 'allowance',
				args: [address, spenderAddress],
			};
		});
	}, [tokenAddress, spenderAddress, address]);

	useContractReads({
		contracts: [...contracts],
		enabled: tokenAddress.length > 0,
		onSuccess: (data) => {
			const res = data[0]?.toString();
			setIsApprove(res > 0);
		},
	});

	const { config } = usePrepareContractWrite({
		address: tokenAddress,
		abi: erc20ABI,
		functionName: 'approve',
		args: [spenderAddress, num],
	});
	const { isLoading, data, write } = useContractWrite(config);

	const { isLoading: waitingLoading } = useWaitForTransaction({
		hash: data?.hash,
		onSuccess: () => {
			setIsApprove(true);
		},
	});

	const loadingContract = useMemo(
		() => isLoading || waitingLoading,
		[isLoading, waitingLoading]
	);

	const approve = useCallback(() => {
		write?.();
	}, [write]);

	return {
		approve,
		loading: loadingContract,
		isApprove,
		setIsApprove,
	};
};

export default useApprove;
