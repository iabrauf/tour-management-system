import React from 'react'

function Users({ users }) {
    return (
        <div className="overflow-x-auto mt-20">
            <table className="table mx-5 w-[95%]">
                {/* head */}
                <thead>
                    <tr className='text-xl'>
                        <th>Sno.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody className='text-base'>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users