import './footerLogin.css';
const FooterLogin = () => {
    return (
        <>
            <footer className="container-fluid">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-between align-items-center fs-14 font-grey">
                        <span>© {new Date().getFullYear()} <a style={{color: '#6357ae'}}>ATI Inc. </a>All rights reserved.</span>
                        <span>
                            Developed By <a style={{color: '#6357ae',textDecoration: 'none'}} href="https://swapinfotech.com/" target="_blank" rel="noopener noreferrer">Swapinfotech.com</a>
                        </span>

                    </div>
                </div>
            </footer>
        </>
    )
}

export default FooterLogin
