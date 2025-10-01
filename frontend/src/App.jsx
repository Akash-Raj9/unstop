import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from './components/Header';

export default function App(){
  return (
    <>
      <Header />
      <main style={{padding:'1rem'}}>
        <Outlet />
      </main>
      <footer style={{textAlign:'center', padding:'1rem'}}>© SynapHack</footer>
    </>
  );
}
