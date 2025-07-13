'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  Button,
  Grid,
  MenuItem,
  Typography
} from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Transaction type definition
type Transaction = {
  id: string
  senderBank: string
  companyAccount: string
  utrNumber: string
  transactionDateTime: string
  recipient?: string
  status: 'Pending' | 'Approved' | 'Rejected'
  adminRemark?: string
}

// Replace this with actual API call
const fetchTransactions = async (): Promise<Transaction[]> => {
  return [
    {
      id: 'T001',
      senderBank: 'HDFC',
      companyAccount: 'ICICI',
      utrNumber: 'UTR123',
      transactionDateTime: '2025-07-10T10:00:00',
      recipient: 'John Doe',
      status: 'Approved',
      adminRemark: 'Matched with bank'
    },
    {
      id: 'T002',
      senderBank: 'SBI',
      companyAccount: 'HDFC',
      utrNumber: 'UTR456',
      transactionDateTime: '2025-07-11T12:00:00',
      recipient: 'Jane Smith',
      status: 'Pending'
    }
  ]
}

const TransactionExport = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' })

  useEffect(() => {
    const load = async () => {
      const data = await fetchTransactions()
      setTransactions(data)
    }
    load()
  }, [])

  const filtered: Transaction[] = transactions.filter(txn => {
    if (filterStatus && txn.status !== filterStatus) return false
    if (dateRange.from && dayjs(txn.transactionDateTime).isBefore(dayjs(dateRange.from))) return false
    if (dateRange.to && dayjs(txn.transactionDateTime).isAfter(dayjs(dateRange.to))) return false
    return true
  })

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filtered)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions')
    XLSX.writeFile(wb, 'transactions.csv')
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('Transaction Report', 14, 20)

    const headers = [['Sender Bank', 'Company Account', 'UTR', 'Date/Time', 'Status', 'Recipient', 'Admin Remark']]
    const rows = filtered.map(txn => [
      txn.senderBank,
      txn.companyAccount,
      txn.utrNumber,
      dayjs(txn.transactionDateTime).format('YYYY-MM-DD HH:mm'),
      txn.status,
      txn.recipient || '-',
      txn.adminRemark || '-'
    ])

    ;(doc as any).autoTable({
  startY: 30,
  head: [['Sender Bank', 'Company Account', 'UTR', 'Date/Time', 'Status', 'Recipient', 'Admin Remark']],
  body: rows
})
    doc.save('transactions.pdf')
  }

  return (
    <Card className='p-6'>
      <Typography variant='h5' className='mb-4'>Transaction Export</Typography>

      <Grid container spacing={4} className='mb-6'>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label='From Date'
            type='date'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dateRange.from}
            onChange={e => setDateRange(prev => ({ ...prev, from: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            label='To Date'
            type='date'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dateRange.to}
            onChange={e => setDateRange(prev => ({ ...prev, to: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            label='Status'
            fullWidth
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='Approved'>Approved</MenuItem>
            <MenuItem value='Rejected'>Rejected</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>

  <Grid container justifyContent='flex-end' spacing={2} sx={{ mt: 4 }}>
  <Grid item>
    <Button variant='contained' onClick={exportCSV}>
      Export CSV
    </Button>
  </Grid>
  <Grid item>
    <Button variant='outlined' onClick={exportPDF}>
      Export PDF
    </Button>
  </Grid>
</Grid>
    </Card>
  )
}

export default TransactionExport
