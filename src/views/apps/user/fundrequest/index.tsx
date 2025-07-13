'use client'

import { useState } from 'react'

// MUI
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Components
import AddTransactionDrawer from './AddTransactionDrawer'
import AdminTransactionDashboard from './AdminTransactionDashboard'
import TransactionApprovalTable from './TransactionApprovalTable'
import TransactionExport from './TransactionExport'
import UserTransactionHistory from './UserTransactionHistory' // Optional, can remove if admin doesn't need
// You could also use Tabs if you want to separate history per user vs system-wide

const FundRequest = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Grid container spacing={6}>
      {/* Section: Header */}
      <Grid item xs={12} className='flex justify-between items-center'>
        <Typography variant='h4'>Fund Request</Typography>
        <Button variant='contained' onClick={() => setDrawerOpen(true)}>
          + Add Fund Transaction
        </Button>
      </Grid>

      {/* Section: Dashboard Cards */}
      <Grid item xs={12}>
        <AdminTransactionDashboard />
      </Grid>
        {/* Section: Export Tool */}
      <Grid item xs={12}>
        <TransactionExport />
      </Grid>

      {/* Section: Approvals Table */}
      <Grid item xs={12}>
        <TransactionApprovalTable />
      </Grid>



      {/* Optional: User History (Could filter to one client or all users) */}
      {/* <Grid item xs={12}>
        <UserTransactionHistory userId='USER_ID_OR_FROM_CONTEXT' />
      </Grid> */}

      {/* Drawer for adding fund request */}
      <AddTransactionDrawer
        open={drawerOpen}
        handleClose={() => setDrawerOpen(false)}
        isAdmin={true}
        onSuccess={() => {
          setDrawerOpen(false)
          // Optionally trigger refresh logic here
        }}
      />
    </Grid>
  )
}

export default FundRequest
