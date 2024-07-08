import './profile.scss'

function Profile() {
    return (
        < >
            <div className="row my-3 mx-3">
                <div className="col-sm-12 col-md-8 d-flex flex-column align-items-center align-items-md-start">
                    <div className="d-flex  flex-column align-items-md-start align-items-center">
                        <h1 className='display-2'>Apisit purisan</h1>
                        <h1>อภิสิทธิ์ ปุริสาร</h1>
                    </div>
                </div>
                <div className="col-sm-12 col-md-4 d-flex justify-content-center">

                    <img src="https://github.com/Apsit007/Apisit_FE/blob/main/src/assets/profile_img.jpg" alt="Profile" className='profile-img' />

                </div>
            </div >
        </>
    )
}

export default Profile