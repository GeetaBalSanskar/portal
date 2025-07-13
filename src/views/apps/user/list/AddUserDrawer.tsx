// React Imports
'use client'
import { useState } from 'react'
import { Snackbar, Alert } from '@mui/material'


// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Types Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { registerWithAPI } from '@/app/api/auth/auth'

type Props = {
  open: boolean
  handleClose: () => void
  userData?: UsersType[]
  setData: React.Dispatch<React.SetStateAction<UsersType[]>>
  onSuccess: () => void
}

type FormValidateType = {
  contact: string
  country: string
  fullName: string
  username: string
  email: string
  role: string
  plan: string
  status: string
}

const AddUserDrawer = (props: Props) => {
  // Props
  const { open, handleClose, userData, setData, onSuccess  } = props
  const [successState, setSuccessState] = useState<{ message: string } | null>(null)
  const [errorState, setErrorState] = useState<{ message: string } | null>(null)
  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      role: '',
      plan: '',
      status: '',
      contact: '',
      country: ''
    }
  })

  const onSubmit = async (data: FormValidateType) => {
let status = false; // Default value

  if (data.status === "Active") {
    status = true;
  }
    const newUser ={
      name: data.fullName,
      username: data.username,
      email: data.email,
      role: data.role,
      country: data.country,
      contact: data.contact,
      isActive: status,
      isKycCompleted: false
    }
    try {
      debugger;
      const res = await registerWithAPI(newUser)
      if (res && res.success && !res.error) {
        setSuccessState({ message: 'User registered successfully' })
        handleClose()
        resetForm()
        onSuccess();
      } else {
        const error = typeof res.error === 'string' ? { message: res.error } : res.error
        setErrorState({ message: error?.message || 'Something went wrong' })
      }

    } catch (err: any) {
      setErrorState({ message: err.message || 'Registration failed' })
    }

    handleClose()
    resetForm({ fullName: '', username: '', email: '', role: '', status: '', country: '', contact: '' })
  }

  const handleReset = () => {
    handleClose()
  }

  return (
    <><Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add New User</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
          <Controller
            name='fullName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Full Name'
                placeholder='John Doe'
                {...(errors.fullName && { error: true, helperText: 'This field is required.' })} />
            )} />
          <Controller
            name='username'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Username'
                placeholder='johndoe'
                {...(errors.username && { error: true, helperText: 'This field is required.' })} />
            )} />
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label='Email'
                placeholder='johndoe@gmail.com'
                {...(errors.email && { error: true, helperText: 'This field is required.' })} />
            )} />
          <Controller
            name='role'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-role'
                label='Select Role'
                {...field}
                {...(errors.role && { error: true, helperText: 'This field is required.' })}
              >
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='user'>user</MenuItem>
              </CustomTextField>
            )} />
          <Controller
            name='status'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-status'
                label='Select Status'
                {...field}
                {...(errors.status && { error: true, helperText: 'This field is required.' })}
              >
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </CustomTextField>
            )} />
          <Controller
            name='country'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-country'
                label='Select country'
                {...field}
                {...(errors.country && { error: true, helperText: 'This field is required.' })}
              >
                <MenuItem value='India'>India</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </CustomTextField>
            )} />
          <Controller
            name='contact'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Contact'
                placeholder='(397) 294-5153'
                {...(errors.contact && { error: true, helperText: 'This field is required.' })} />
            )} />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
    <Snackbar
      open={!!successState}
      autoHideDuration={3000}
      onClose={() => setSuccessState(null)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <Alert onClose={() => setSuccessState(null)} severity="success" variant="filled">
          {successState?.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorState}
        autoHideDuration={3000}
        onClose={() => setErrorState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorState(null)} severity="error" variant="filled">
          {errorState?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddUserDrawer
