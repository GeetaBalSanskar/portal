'use client'

import { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  Button
} from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

// Mock API: Replace with real authenticated API
const fetchUserTransactions = async (userId: string) => {
  return [
    {
      id: '1',
      senderBank: 'ICICI',
      companyAccount: 'HDFC',
      utrNumber: 'UTR987654321',
      transactionDateTime: '2025-07-10T14:45:00Z',
      recipient: 'Company A',
      status: 'Approved',
      adminRemark: 'Verified and matched with bank records.'
    },
    {
      id: '2',
      senderBank: 'SBI',
      companyAccount: 'HDFC',
      utrNumber: 'UTR123456789',
      transactionDateTime: '2025-07-08T09:30:00Z',
      status: 'Pending'
    }
  ]
}

const UserTransactionHistory = ({ userId }: { userId: string }) => {
  const [transactions, setTransactions] = useState<any[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('')

  useEffect(() => {
    const load = async () => {
      const data = await fetchUserTransactions(userId)
      setTransactions(data)
    }

    load()
  }, [userId])

  const filtered = transactions.filter(txn => {
    if (!filterStatus) return true
    return txn.status === filterStatus
  })

  return (
    <Card className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <Typography variant='h5'>My Transactions</Typography>
        <CustomTextField
          select
          size='small'
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          label='Filter Status'
          style={{ width: 180 }}
        >
          <MenuItem value=''>All</MenuItem>
          <MenuItem value='Pending'>Pending</MenuItem>
          <MenuItem value='Approved'>Approved</MenuItem>
          <MenuItem value='Rejected'>Rejected</MenuItem>
        </CustomTextField>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sender Bank</TableCell>
            <TableCell>Deposit Account</TableCell>
            <TableCell>UTR</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Admin Remark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align='center'>
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            filtered.map(txn => (
              <TableRow key={txn.id}>
                <TableCell>{txn.senderBank}</TableCell>
                <TableCell>{txn.companyAccount}</TableCell>
                <TableCell>{txn.utrNumber}</TableCell>
                <TableCell>{new Date(txn.transactionDateTime).toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={txn.status}
                    color={
                      txn.status === 'Approved'
                        ? 'success'
                        : txn.status === 'Rejected'
                          ? 'error'
                          : 'warning'
                    }
                    size='small'
                    variant='outlined'
                  />
                </TableCell>
                <TableCell>
                  {txn.adminRemark ? txn.adminRemark : '-'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
}

export default UserTransactionHistory
