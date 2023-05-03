import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Input,
	Stack,
	Switch,
	Table,
	styled,
	TableHead,
	TableRow,
	TableCell,
	Typography,
	TableContainer,
	Box,
	TableBody,
	Link,
} from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { LoadingButton } from '@mui/lab';
import {
	digitDefault,
	digitsDifferentLengthToDefaultPrice,
	digitsLength,
	tokenSetDefault,
} from '../../config/profilePageSetting';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
	contractForDec,
	contractForToken,
	tokenContract,
} from '../../config/contract';
import {
	formatUnitsWitheDecimals,
	parseUnitsWithDecimals,
	splitAddress,
	zeroAddress,
} from '../../utils';

const Cell = styled(TableCell)(({ theme }) => ({
	width: '50px',
	padding: theme.spacing(1),
	textAlign: 'center',
	input: {
		width: '100%',
		border: 'none',
		backgroundColor: 'transparent',
		textAlign: 'center',
		fontSize: theme.typography.fontSize,
		...theme.typography.caption,
		':active,:hover,:focus-visible': {
			border: 'none',
		},
		'&:focus-visible': {
			border: 'none',
			outline: 'none',
		},
	},
}));

const Label = styled(Typography)(() => ({}));

const ManageDomain = ({
	onClick,
	loading = false,
	isSuccess = false,
	onChange,
	changeReceivingAddress,
	defaultValue = [],
}) => {
	const { address } = useAccount();

	const [checkList, setCheckList] = useState(tokenSetDefault);
	const [tokenPriceList, setTokenPriceList] = useState({});
	const [digitChecked, setDightChecked] = useState(true);
	const [updateAddrDisabled, setUpdateAddrDisabled] = useState(true);
	const [receivingAddress, setReceivingAddress] = useState(null);

	const calCheckedCount = useMemo(() => {
		const arr = Object.values(checkList);
		const checkedList = arr.filter((item) => item === true);
		return checkedList.length;
	}, [checkList]);

	const tableWidth = useMemo(() => {
		return calCheckedCount * 20;
	}, [calCheckedCount]);

	const handleChangeToken = useCallback(
		(event) => {
			const name = event.target.name;
			const checked = event.target.checked;
			const newChecked = { ...checkList, [name]: checked };
			// get true length in checklist
			const trueLength = Object.values(newChecked).filter(
				(item) => item === true
			).length;

			// required choose one
			if (trueLength >= 1) {
				setCheckList({ ...newChecked });
			} else {
				setCheckList({ ...checkList });
			}
			if (checked) {
				setTokenPriceList((v) => {
					return {
						...v,
						[name]: [...digitsDifferentLengthToDefaultPrice],
					};
				});
			} else if (trueLength >= 1) {
				setTokenPriceList((v) => {
					const _v = { ...v };
					delete _v[name];
					return { ..._v };
				});
			}
		},
		[checkList]
	);

	const changeTokenList = useCallback(
		(list, checked = null) => {
			const p = list['USDT'];
			const pWithDec =
				(p &&
					p.map((item) => {
						return parseUnitsWithDecimals(item, contractForDec['USDT']);
					})) ||
				[];
			const obj =
				(p && [
					{
						mode: checked === null ? (digitChecked ? 1 : 0) : checked ? 1 : 0,
						token: tokenContract['USDT'],
						prices: [...pWithDec],
					},
				]) ||
				[];

			onChange && typeof onChange === 'function' && onChange(obj);
		},
		[onChange, digitChecked]
	);

	const handleChangeDigit = useCallback(
		(event) => {
			setDightChecked(event.target.checked);
			setCheckList({ ...tokenSetDefault });

			let list = {};
			if (event.target.checked) {
				list = {
					USDT: [...digitsDifferentLengthToDefaultPrice],
				};
			} else {
				list = {
					USDT: [digitDefault],
				};
			}

			changeTokenList(list, event.target.checked);
			setTokenPriceList((v) => {
				return { ...list };
			});
		},
		[changeTokenList]
	);

	const [saveTimeId, setSaveTimeId] = useState(null);

	const changePrice = useCallback(
		(v, token, pricePlace) => {
			saveTimeId && clearTimeout(saveTimeId);
			const id = setTimeout(() => {
				const oldTokenPrice = tokenPriceList[token]
					? [...tokenPriceList[token]]
					: [...digitsDifferentLengthToDefaultPrice];
				const newPrice = v.target.value;
				oldTokenPrice.splice(pricePlace, 1, newPrice);
				setTokenPriceList((v) => {
					return {
						...v,
						[token]: oldTokenPrice,
					};
				});
				changeTokenList &&
					changeTokenList({ ...tokenPriceList, [token]: oldTokenPrice });
			}, 300);
			setSaveTimeId(id);
			return () => saveTimeId && clearTimeout(saveTimeId);
		},
		[tokenPriceList, saveTimeId, changeTokenList]
	);

	const changeReceivingAddressInput = useCallback(
		(e) => {
			setReceivingAddress(e.target.value);
			changeReceivingAddress && changeReceivingAddress(e.target.value);
		},
		[changeReceivingAddress]
	);

	const onConfirm = useCallback(() => {
		onClick && typeof onClick === 'function' && onClick();
	}, [onClick]);

	useEffect(() => {
		if (defaultValue > 0 && defaultValue[0]?.token === zeroAddress) {
			defaultValue.forEach((item) => {
				setDightChecked(!!item.mode);
				const symbolToken = contractForToken[item.token];
				setCheckList((v) => {
					return { ...v, [symbolToken]: true };
				});
				const prices = item.prices;
				const pricesDisplay = prices.map((i) =>
					formatUnitsWitheDecimals(i, contractForDec['USDT'])
				);
				setTokenPriceList((v) => {
					return {
						...v,
						[symbolToken]: pricesDisplay,
					};
				});
			});
		} else {
			setTokenPriceList({
				USDT: [...digitsDifferentLengthToDefaultPrice],
			});
		}
	}, [defaultValue]);

	return (
		<>
			{/* Choose tokens */}
			<Stack direction="row" alignItems="center" spacing={2}>
				<Label>Paid token:</Label>
				<FormGroup
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					{Object.keys(checkList).map((value, index) => (
						<FormControlLabel
							key={index}
							control={
								<Checkbox
									name={value}
									// value={checkList[value]}
									checked={checkList[value]}
									// required={value === 'USDT'}
									disabled={value !== 'USDT'}
									onChange={handleChangeToken}
								/>
							}
							label={value}
						/>
					))}
				</FormGroup>
			</Stack>
			{/* Receiving adress */}
			<Stack direction="row" alignItems="center" spacing={1}>
				<Label>Receiving address:</Label>
				{updateAddrDisabled ? (
					<Label>{splitAddress(address)}</Label>
				) : (
					<Input
						value={receivingAddress || address}
						onChange={changeReceivingAddressInput}
						disableUnderline={true}
					/>
				)}

				<Link
					underline="none"
					onClick={() => {
						setUpdateAddrDisabled(!updateAddrDisabled);
					}}
					sx={(theme) => ({
						color: updateAddrDisabled ? theme.color.main : theme.color.success,
						fontWeight: 800,
					})}
				>
					{updateAddrDisabled ? 'Update Addr' : 'done'}
				</Link>
			</Stack>
			{/* Pricing */}
			<Stack direction="row" alignItems="center" spacing={1}>
				<Label>Pricing: by-digit</Label>
				<Switch checked={digitChecked} onChange={handleChangeDigit} />
			</Stack>
			<TableContainer
				sx={(theme) => ({
					width: digitChecked ? '80%' : `${tableWidth}%`,
					minWidth: '30%',
					maxWidth: '100%',
					border: '1px solid #0000001A',
					borderRadius: theme.spacing(1),
				})}
			>
				{digitChecked ? (
					<Table>
						<TableHead>
							<TableRow sx={{ borderRadius: '20px' }}>
								<Cell>Token/digit</Cell>
								{digitsLength.map((item) => (
									<Cell key={item}>{item}</Cell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.keys(checkList).map((value) =>
								checkList[value] ? (
									<TableRow key={value}>
										<Cell component="th" scope="row">
											{value}
										</Cell>
										{/* <Cell>{tokenPriceList[value]}</Cell> */}
										{tokenPriceList[value] &&
											tokenPriceList[value].map((price, index) => (
												<Cell component="th" scope="row" key={index}>
													<input
														defaultValue={price}
														onInput={(v) => changePrice(v, value, index)}
													/>
												</Cell>
											))}
									</TableRow>
								) : (
									''
								)
							)}
						</TableBody>
					</Table>
				) : (
					<Table>
						<TableHead>
							<TableRow sx={{ borderRadius: '20px' }}>
								<Cell>Token</Cell>
								{Object.keys(checkList).map((value) =>
									checkList[value] ? <Cell key={value}>{value}</Cell> : ''
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<Cell component="th" scope="row">
									Price
								</Cell>
								{Object.keys(checkList).map((value) =>
									tokenPriceList[value] ? (
										<Cell component="th" scope="row" key={value}>
											<input
												defaultValue={tokenPriceList[value]?.[0]}
												onInput={(v) => changePrice(v, value, 0)}
											/>
										</Cell>
									) : (
										''
									)
								)}
							</TableRow>
						</TableBody>
					</Table>
				)}
			</TableContainer>
			{isSuccess ? (
				<Stack flexDirection="row" justifyContent="center">
					<Typography
						sx={(theme) => ({
							color: theme.color.success,
							mr: 1,
						})}
					>
						Settings successful
					</Typography>
					<CheckCircleIcon
						sx={(theme) => ({
							color: theme.color.success,
						})}
					/>
				</Stack>
			) : (
				<Box>
					<LoadingButton
						onClick={onConfirm}
						sx={{ width: '85px' }}
						variant="contained"
						loading={loading}
					>
						Confirm
					</LoadingButton>
				</Box>
			)}
		</>
	);
};

export default memo(ManageDomain);
