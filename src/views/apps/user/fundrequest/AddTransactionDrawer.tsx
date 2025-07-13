'use client'

import { useState } from 'react'
import {
  Button,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import DatePicker from '@mui/lab/DateTimePicker' // Or a custom picker if you're using one

type TransactionFormType = {
  senderBank: string
  companyAccount: string
  utrNumber: string
  transactionDateTime: Date | null
  recipient?: string
  adminRemark?: string
}

type Props = {
  open: boolean
  handleClose: () => void
  isAdmin?: boolean
  onSuccess: () => void
}

const AddTransactionDrawer = ({ open, handleClose, isAdmin = false, onSuccess }: Props) => {
  const [successState, setSuccessState] = useState<string | null>(null)
  const [errorState, setErrorState] = useState<string | null>(null)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<TransactionFormType>({
    defaultValues: {
      senderBank: '',
      companyAccount: '',
      utrNumber: '',
      transactionDateTime: new Date(),
      recipient: '',
      adminRemark: ''
    }
  })

  const onSubmit = async (data: TransactionFormType) => {
    try {
      // Replace with your actual API call
      console.log('Submitting Transaction:', data)

      // Assume success for now
      setSuccessState('Transaction submitted successfully')
      reset()
      handleClose()
      onSuccess()
    } catch (error) {
      setErrorState('Failed to submit transaction')
    }
  }

  const handleReset = () => {
    reset()
    handleClose()
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        onClose={handleReset}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Add Fund Transaction</Typography>
          <IconButton onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          <Controller
            name='senderBank'
            control={control}
            rules={{ required: 'Sender Bank is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Sender Bank Account'
                fullWidth
                error={!!errors.senderBank}
                helperText={errors.senderBank?.message}
              />
            )}
          />

          <Controller
            name='companyAccount'
            control={control}
            rules={{ required: 'Company account is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                label='Company (Deposit) Account'
                fullWidth
                error={!!errors.companyAccount}
                helperText={errors.companyAccount?.message}
              >
                <MenuItem value='HDFC'>HDFC</MenuItem>
                <MenuItem value='ICICI'>ICICI</MenuItem>
                <MenuItem value='SBI'>SBI</MenuItem>
              </CustomTextField>
            )}
          />

          <Controller
            name='utrNumber'
            control={control}
            rules={{ required: 'UTR Number is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='UTR Number'
                fullWidth
                error={!!errors.utrNumber}
                helperText={errors.utrNumber?.message}
              />
            )}
          />

          <Controller
            name='transactionDateTime'
            control={control}
            rules={{ required: 'Transaction date is required' }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label='Transaction Date/Time'
                renderInput={(params:any) => (
                  <CustomTextField
                    {...params}
                    fullWidth
                    error={!!errors.transactionDateTime}
                    helperText={errors.transactionDateTime?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            name='recipient'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} label='Recipient (Optional)' fullWidth />
            )}
          />

          {isAdmin && (
            <Controller
              name='adminRemark'
              control={control}
              render={({ field }) => (
                <CustomTextField {...field} label='Admin Remark' fullWidth multiline minRows={3} />
              )}
            />
          )}

          <div className='flex items-center gap-4'>
            <Button type='submit' variant='contained'>
              Submit
            </Button>
            <Button type='reset' color='error' variant='tonal' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>

      <Snackbar
        open={!!successState}
        autoHideDuration={3000}
        onClose={() => setSuccessState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessState(null)} severity='success' variant='filled'>
          {successState}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorState}
        autoHideDuration={3000}
        onClose={() => setErrorState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorState(null)} severity='error' variant='filled'>
          {errorState}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddTransactionDrawer
