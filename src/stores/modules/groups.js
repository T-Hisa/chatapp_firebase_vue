import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
const db = firebase.database()
const groupsRef = db.ref('groups')

const groupsModule = {
  namespaced: true,
  state: () => ({
    groups: {
    }
  }),
  getters: {
    getGroupIds: (state) => {
      return Object.keys(state.groups).filter(gid => {
        return !state.groups[gid].isDelete
      })
    },
    getGroups: (state, getters) => {
      const groupIds = getters.getGroupIds
      const groups = groupIds.map(gid => {
        return state.groups[gid]
      })
      return groups
    },
    getGroupInfo: (state) => gid => {
      return state.groups[gid]
    },
    searchGroupIdsByName: (state) => searchParams => {
      const {groups} = state
      const searchGroups = Object.keys(groups).filter(gid => {
        const group = groups[gid]
        return !group.isDelete && group.groupName.indexOf(searchParams) > -1
      })
      return searchGroups
    }
  },
  actions: {
    getGroups: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('groups', groupsRef, { wait: true })
    }),
    updateGroup: firebaseAction((_, value) => {
      let updateGroupRef = groupsRef.child(value.gid)
      updateGroupRef.update(value.value)
    }),
    createGroup: firebaseAction((_, value) => {
      let newGroupKey = groupsRef.push().key
      groupsRef.child(newGroupKey).set(value)
    }),
    deleteGroup: firebaseAction((_, gid) => {
      const deleteGroupRef = groupsRef.child(gid)
      deleteGroupRef.update({isDelete: true})
    })
  }
}

export default groupsModule
