'use client'

import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { IconPlus, IconSend, IconScan } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const WalletDashboard = () => {
  const router = useRouter()

const handleNavigation = (path: string) => {
  router.push(`apps/finsova${path}`)
}
  return (
    <Grid container spacing={6}>
      {/* Wallet Balance Card */}
      <Grid size={{ xs: 12 }}>
        <Card
          sx={{
            background: '#fff',
            borderRadius: 4,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            px: 3,
            py: 4
          }}
        >
          <CardContent>
            <Typography variant='subtitle1' color='text.secondary'>
              Wallet Balance
            </Typography>
            <Typography variant='h4' fontWeight='bold' sx={{ mt: 1 }}>
              $8,540.00
            </Typography>

            <Stack direction='row' spacing={2} mt={4}>
              <Button
                variant='contained'
                startIcon={<IconPlus size={18} />}
                onClick={() => handleNavigation('/wallet/add-money')}
              >
                Add Money
              </Button>
              <Button
                variant='outlined'
                startIcon={<IconSend size={18} />}
                onClick={() => handleNavigation('/wallet/send-money')}
              >
                Send Money
              </Button>
              <Button
                variant='outlined'
                startIcon={<IconScan size={18} />}
                onClick={() => handleNavigation('/wallet/scan-pay')}
              >
                Scan & Pay
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Add more functionality below */}
      {/* <Grid size={{ xs: 12 }}>
        <Box mt={4}>
          <Typography variant='h6'>Recent Transactions</Typography>
          <Typography variant='body2' color='text.secondary'>
            No transactions yet. Add money or send to get started.
          </Typography>
        </Box>
      </Grid>*/}
    </Grid>
  )
}

export default WalletDashboard
