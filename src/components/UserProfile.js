export const UserProfile = ( {user} ) => {
    return (
        <>
            <div className="user-item d-flex">
                <img alt="" src={user.avatar_urls ? user.avatar_urls["96"] : ""} width="150px" height="150px" />
                <div>
                    <h1>{user.name}</h1>
                    <div>{user.slug}</div>
                    <a target="_blank" href={user.link} rel="noreferrer">{user.link}</a>
                    <div>อธิบายตัวเอง : {user.description === "" ? "ไม่มี": user.description}</div>
                </div>
            </div>
        </>
    )
}