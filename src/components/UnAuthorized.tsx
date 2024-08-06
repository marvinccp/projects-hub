import { Link } from "wouter"

export const UnAuthorized = () => {
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'400px',
        height:'200px',color:'red',
        fontSize:'2rem',
        flexDirection:'column',
    }}>
        <h1>Unauthorized</h1>
        <p style={{
            fontSize:'1rem'
        }}>You do not have permission to view this page.</p>
        <Link to="/home">
        <button style={{
            fontSize:'1rem',
            color:'grey',
            border:'none',
            borderRadius:'5px',
            cursor:'pointer',
            width:'170px',
            marginTop:'25px'

        }}>Back to Home</button>
        </Link>
        </div>
  )
}
