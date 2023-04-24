import { useContractRead } from 'wagmi';
import { subdomainABI } from '../config/ABI';
import { reflectContract } from '../config/contract';
import { pricingHash } from '../utils';
import { useMemo } from 'react';

const useGetPrice = (name = '', tokenArray = []) => {
	const pricingArray = useMemo(() => {
		return tokenArray.map((item) => pricingHash(name, item));
	}, [tokenArray, name]);

	const { data: prices } = useContractRead({
		abi: subdomainABI,
		address: reflectContract,
		functionName: 'getPricing',
		args: [[...pricingArray]],
	});

	return prices;
};

export default useGetPrice;
