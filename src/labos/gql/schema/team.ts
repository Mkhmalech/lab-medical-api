export const LaboTeam =`
    type LaboTeam {
        addNewRole(name : String) : String
        updateRole(name : String) : String
        deleteRole(name : String) : String
        addPermissionToRole(permission : Boolean) : String
        updatePermissionToRole(permission : Boolean) : String
    }
`