import { ethers } from 'ethers';

export const splitAddress = (address, start = 5, end = -4) => {
	return (
		(address && address.slice(0, start) + '...' + address.slice(end)) || ''
	);
};

export const ensHashName = (name) => ethers.utils.namehash(name);

export const parseUnitsWithDecimals = (n, dec = '') =>
	ethers.utils.parseUnits((n || '').toString(), dec);

export const pricingHash = function (name, token) {
	const node = ensHashName(name);
	const hash = ethers.utils.keccak256(
		ethers.utils.solidityPack(['bytes32', 'address'], [node, token])
	);

	return ethers.utils.hexlify(hash);
};

export const formatUnitsWitheDecimals = (n, dec) =>
	ethers.utils.formatUnits(n, dec);
