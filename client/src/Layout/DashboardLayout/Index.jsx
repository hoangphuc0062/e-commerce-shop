import { Outlet } from "react-router-dom"


function DashboardLayout() {
  return (
    <>
       <header>
        <h1>Dashboard Header</h1>
      </header>
      <div style={{ display: 'flex' }}>
        <nav style={{ width: '200px' }}>
          <ul>
            <li><a href="/">Trang Chủ</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
        </nav>
        <main style={{ marginLeft: '200px', padding: '20px' }}>
          {/* The content of dashboard routes will be rendered here */}
          <Outlet />
        </main>
      </div>
      <footer>
        <p>Dashboard Footer</p>
      </footer>
    </>
  )
}

export default DashboardLayout
