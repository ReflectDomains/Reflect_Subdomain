import { ethers } from 'ethers';
import { namehash } from '@ensdomains/ensjs/utils/normalise';

export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const splitAddress = (address, start = 5, end = -4) => {
	return (
		(address && address.slice(0, start) + '...' + address.slice(end)) || ''
	);
};

export const addENSNameSuffix = (search) => {
	const lowerSearch = search.toLowerCase();
	const hasSuffix = lowerSearch.endsWith('.eth');
	if (hasSuffix) {
		return lowerSearch;
	} else {
		return lowerSearch + '.eth';
	}
};

export const isSubdomainRegx = (str) => {
	return /^[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]+\.eth$/.test(str);
};

export const ensHashName = (name = '') => namehash(name);

export const parseUnitsWithDecimals = (n, dec = '') =>
	ethers.utils.parseUnits((n || '').toString(), dec);

export const pricingHash = function (name, token) {
	if (!name) return '';
	const node = ensHashName(name);
	const hash = ethers.utils.keccak256(
		ethers.utils.solidityPack(['bytes32', 'address'], [node, token])
	);

	return ethers.utils.hexlify(hash);
};

export const formatUnitsWitheDecimals = (n, dec) =>
	ethers.utils.formatUnits(n, dec);

export const splitEth = (name) => name?.split('.eth')[0];

export const throttle = (fn, delay) => {
	let throttleTimer = null;
	return function () {
		if (throttleTimer) return;
		throttleTimer = setTimeout(() => {
			fn.apply(this, arguments);
			throttleTimer = null;
		}, delay);
	};
};

export const debounce = (fn, delay) => {
	let debounceTimer = null;
	return function () {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			fn.apply(this, arguments);
			debounceTimer = null;
		}, delay);
	};
};

export const toScan = (hash) => {
	window.open(`https://goerli.etherscan.io/tx/${hash}`)
}
