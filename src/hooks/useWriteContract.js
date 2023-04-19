import { useMemo } from 'react';
import subdomainABI from '../config/ABI/subdimain.json';
import {
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
} from 'wagmi';

const useWriteContract = ({ functionName, args = [] }) => {
	const { config } = usePrepareContractWrite({
		address: '',
		abi: subdomainABI,
		functionName: functionName,
		args: [...args],
	});
	const { isLoading, data, write } = useContractWrite(config);

	const { isLoading: waitingLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
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
