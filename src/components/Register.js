import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/logo.png';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { registerValidation } from '../helper/validate';
import covertToBase64 from '../helper/convert';

import styles from '../styles/Username.module.css';

export default function Register() {

  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues : {
      email: '',
      username: '',
      password : ''
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile : file || ''})
      console.log(values)
    }
  })

  const onUpload = async e => {
    const base64 = await covertToBase64(e.target.files[0]);
    setFile(base64);
  }


  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: "45%", paddingTop: '1em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Happy to join you!
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-2'>
                <label htmlFor="profile">
                  <img src={file || avatar} className={styles.profile_img} alt="avatar"/>
                </label>

                <input onChange={onUpload} type="file" id="profile" name="profile"/>
            </div>

            <div className="textBox flex flex-col items-center gap-1">
              <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder="Email" />
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder="Username" />
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder="Password" />
              <button className={styles.btn} type="password">Register</button>
            </div>

            <div className="text-center py-3">
              <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login now</Link></span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}
