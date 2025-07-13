'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

// Mocked API for now
const fetchTransactions = async () => {
  return [
    {
      id: '1',
      senderBank: 'ICICI',
      companyAccount: 'SBI',
      utrNumber: 'UTR123456789',
      transactionDateTime: '2025-07-11T10:00:00Z',
      recipient: 'Mr. X',
      status: 'Pending'
    }
  ]
}

const TransactionApprovalTable = () => {
  const [transactions, setTransactions] = useState<any[]>([])
  const [selectedTxn, setSelectedTxn] = useState<any | null>(null)
  const [adminRemark, setAdminRemark] = useState('')
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const getData = async () => {
    const data = await fetchTransactions()
    setTransactions(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleApprove = async (status: 'Approved' | 'Rejected') => {
    if (!selectedTxn) return
    // Replace with real API call
    console.log('Updating:', {
      id: selectedTxn.id,
      status,
      adminRemark
    })

    setSuccessMsg(`Transaction ${status}`)
    setSelectedTxn(null)
    setAdminRemark('')
    getData()
  }

  return (
    <>
      <Card className='p-4'>
        <Typography variant='h5' className='mb-4'>Transaction Request</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sender Bank</TableCell>
              <TableCell>Company Account</TableCell>
              <TableCell>UTR</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align='center'>No data found</TableCell>
              </TableRow>
            ) : (
              transactions.map(txn => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.senderBank}</TableCell>
                  <TableCell>{txn.companyAccount}</TableCell>
                  <TableCell>{txn.utrNumber}</TableCell>
                  <TableCell>{new Date(txn.transactionDateTime).toLocaleString()}</TableCell>
                  <TableCell>{txn.recipient || '-'}</TableCell>
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
                      variant='outlined'
                      size='small'
                    />
                  </TableCell>
                  <TableCell>
                    {txn.status === 'Pending' ? (
                      <Button variant='outlined' size='small' onClick={() => setSelectedTxn(txn)}>
                        Review
                      </Button>
                    ) : (
                      <Typography variant='body2' color='textSecondary'>Completed</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Approval Dialog */}
      <Dialog open={!!selectedTxn} onClose={() => setSelectedTxn(null)} maxWidth='sm' fullWidth>
        <DialogTitle>Approve/Reject Transaction</DialogTitle>
        <DialogContent>
          <Typography mb={2}>
            UTR: <strong>{selectedTxn?.utrNumber}</strong>
          </Typography>
          <CustomTextField
            fullWidth
            multiline
            minRows={3}
            label='Admin Remark'
            value={adminRemark}
            onChange={e => setAdminRemark(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={() => handleApprove('Rejected')}>Reject</Button>
          <Button variant='contained' onClick={() => handleApprove('Approved')}>Approve</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={3000}
        onClose={() => setSuccessMsg(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMsg(null)} severity='success' variant='filled'>
          {successMsg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default TransactionApprovalTable
