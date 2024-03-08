import React, { Component } from 'react'
import HeaderLayout from '../components/HeaderLayout'
import { Outlet } from 'react-router-dom'

export default class HomeTemplate extends Component {
    render() {
        return (
            <div>
                <HeaderLayout />
                <Outlet />

                <footer className='bg-dark text-white text-center p5'>Đây là Footer</footer>
            </div>
        )
    }
}
