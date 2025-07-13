'use client'

import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'

import {
  IconDeviceMobile,
  IconBulb,
  IconCreditCard,
  IconBuildingBank,
  IconCurrencyDollar,
  IconChartLine,
  IconShield,
  IconGift
} from '@tabler/icons-react'

const services = [
  {
    name: 'Mobile Recharge',
    icon: <IconDeviceMobile size={66} stroke={1.5} />,
    link: '/apps/finsova/bbps/mobile-prepaid'
  },
  {
    name: 'Electricity Bill',
    icon: <IconBulb size={66} stroke={1.5} />,
    link: '/ '
  },
  {
    name: 'Credit Card',
    icon: <IconCreditCard size={66} stroke={1.5} />,
    link: '/apps/finsova/bbps/credit-card'
  },
  {
    name: 'Bank Transfer',
    icon: <IconBuildingBank size={66} stroke={1.5} />
    // no link
  },
  {
    name: 'Loans',
    icon: <IconCurrencyDollar size={66} stroke={1.5} />,
    link: '/apps/finsova/bbps/loan-repayment'
  },
  {
    name: 'Investments',
    icon: <IconChartLine size={66} stroke={1.5} />,
    link: '/apps/finsova/bbps/education'
  },
  {
    name: 'Insurance',
    icon: <IconShield size={66} stroke={1.5} />,
    link: '/apps/finsova/bbps/insurance'
  },
  {
    name: 'Offers & Rewards',
    icon: <IconGift size={66} stroke={1.5} />
    // no link
  }
]

const ServicesDashboard = () => {
  const router = useRouter()

  const handleClick = (link?: string) => {
    if (link) {
      router.push(link)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
              <Card
                onClick={() => handleClick(service.link)}
                elevation={0}
                sx={{
                  border: '1px solid #E0E0E0',
                  textAlign: 'center',
                  borderRadius: 4,
                  p: 4,
                  height: '100%',
                  cursor: service.link ? 'pointer' : 'default',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    boxShadow: service.link ? 3 : 'none',
                    borderColor: service.link ? 'primary.main' : '#E0E0E0'
                  }
                }}
              >
                <Box display='flex' justifyContent='center' mb={2} color='primary.main'>
                  {service.icon}
                </Box>
                <Typography variant='body1' fontWeight={500}>
                  {service.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ServicesDashboard
