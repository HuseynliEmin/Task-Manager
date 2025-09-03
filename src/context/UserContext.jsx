import { createContext, useEffect, useState } from "react";


export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    //sending user to local storage
    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        if (savedUser) setUser(JSON.parse(savedUser))
    }, [])

    //deletion from local storage when logged out
    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user))
        else localStorage.removeItem("user")

    }, [user])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>


    )

}