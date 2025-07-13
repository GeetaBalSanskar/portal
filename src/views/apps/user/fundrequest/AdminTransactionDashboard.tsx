'use client'

import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import type { ThemeColor } from '@core/types' // adjust path based on your project

type StatsData = {
  total: number
  pending: number
  approved: number
  rejected: number
  today: number
  thisMonth: number
}

type CardData = {
  title: string
  stats: string
  avatarIcon: string
  avatarColor: ThemeColor
  trend: 'positive' | 'neutral' | 'negative'
  trendNumber: string
  subtitle: string
}

const fetchDashboardStats = async (): Promise<StatsData> => {
  // Replace this with your real API call
  return {
    total: 120,
    pending: 18,
    approved: 90,
    rejected: 12,
    today: 6,
    thisMonth: 35
  }
}

const AdminTransactionDashboard = () => {
  const [stats, setStats] = useState<StatsData>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    today: 0,
    thisMonth: 0
  })

  useEffect(() => {
    const load = async () => {
      const data = await fetchDashboardStats()
      setStats(data)
    }

    load()
  }, [])

  const cardData: CardData[] = [
    {
      title: 'Total Transactions',
      stats: stats.total.toString(),
      avatarIcon: 'tabler-transfer',
      avatarColor: 'primary',
      trend: 'positive',
      trendNumber: '+0%',
      subtitle: 'All time'
    },
    {
      title: 'Pending Approvals',
      stats: stats.pending.toString(),
      avatarIcon: 'tabler-hourglass',
      avatarColor: 'warning',
      trend: 'neutral',
      trendNumber: '',
      subtitle: 'Awaiting review'
    },
    {
      title: 'Approved',
      stats: stats.approved.toString(),
      avatarIcon: 'tabler-check',
      avatarColor: 'success',
      trend: 'positive',
      trendNumber: '+12%',
      subtitle: 'Verified transfers'
    },
    {
      title: 'Rejected',
      stats: stats.rejected.toString(),
      avatarIcon: 'tabler-x',
      avatarColor: 'error',
      trend: 'negative',
      trendNumber: '-3%',
      subtitle: 'Flagged issues'
    },
    {
      title: 'Today',
      stats: stats.today.toString(),
      avatarIcon: 'tabler-calendar',
      avatarColor: 'info',
      trend: 'positive',
      trendNumber: '+6%',
      subtitle: 'Submitted today'
    },
    {
      title: 'This Month',
      stats: stats.thisMonth.toString(),
      avatarIcon: 'tabler-calendar-month',
      avatarColor: 'secondary',
      trend: 'positive',
      trendNumber: '+18%',
      subtitle: 'Monthly volume'
    }
  ]

  return (
    <Grid container spacing={6}>
      {cardData.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default AdminTransactionDashboard
