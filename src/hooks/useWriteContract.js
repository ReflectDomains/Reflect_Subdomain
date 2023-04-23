import { useCallback, useMemo } from 'react';
import { subdomainABI } from '../config/ABI';
import {
	useAccount,
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
} from 'wagmi';
import { reflectContract } from '../config/contract';

const useWriteContract = ({
	functionName,
	args = [],
	enabled = true,
	onSuccess,
	contractAddress = '',
	ABIJSON = null,
}) => {
	const { address } = useAccount();
	const successFn = useCallback(() => {
		onSuccess && typeof onSuccess === 'function' && onSuccess();
	}, [onSuccess]);

	const { config } = usePrepareContractWrite({
		address: contractAddress || reflectContract,
		abi: ABIJSON || subdomainABI,
		functionName: functionName,
		args: [...args],
		enabled: enabled && address,
		overrides: {
			from: address,
		},
		onError: (error) => {
			console.log(error?.error?.data?.message);
		},
	});
	const { isLoading, data, write } = useContractWrite(config);

	const { isLoading: waitingLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
		onSuccess: successFn,
	});

	const loadingContract = useMemo(
		() => isLoading || waitingLoading,
		[isLoading, waitingLoading]
	);

	return {
		isLoading: loadingContract,
		write,
		isSuccess,
	};
};

export default useWriteContract;
