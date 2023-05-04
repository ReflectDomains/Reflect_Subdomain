import {
	Table,
	TableBody,
	TableHead,
	TableRow,
	styled,
	TableCell,
	Pagination,
} from '@mui/material';
import { memo } from 'react';
import { formatUnitsWitheDecimals } from '../../../utils';
import { splitAddress } from '../../../utils';

const HeadCell = styled(TableCell)(({ theme }) => ({
	padding: theme.spacing(1, 1, 0, 1),
	borderBottom: 'none',
	fontWeight: 800,
	color: theme.color.mentionColor,
	fontSize: '14px',
}));

const Cell = styled(TableCell)(({ theme }) => ({
	padding: theme.spacing(1),
	borderBottom: 'none',
	color: theme.color.text,
	fontWeight: 500,
	fontSize: '16px',
}));

const TransactionTable = ({ data = [] }) => {
	return (
		<>
			<Table>
				<TableHead>
					<TableRow sx={{ borderRadius: '20px' }}>
						<HeadCell>sold subname</HeadCell>
						<HeadCell>price</HeadCell>
						<HeadCell>tx hash</HeadCell>
						<HeadCell>tx time</HeadCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item, index) => (
						<TableRow key={index}>
							<Cell component="th" scope="row">
								{item.domain}
							</Cell>
							<Cell component="th" scope="row">
								{formatUnitsWitheDecimals(item.amount, 18)}
							</Cell>
							<Cell component="th" scope="row">
								{splitAddress(item.tx_hash)}
							</Cell>
							<Cell component="th" scope="row">
								{item.block_time}
							</Cell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Pagination
				count={10}
				shape="rounded"
				size="small"
				sx={{
					marginTop: '20px',
					'.MuiPagination-ul': {
						justifyContent: 'flex-end',
					},
				}}
			/>
		</>
	);
};

export default memo(TransactionTable);
