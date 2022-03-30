import aes256 from 'aes256'


export class AppState {
  constructor() {
    this.data = null
    this.activeWorkspaceId = (localStorage['activeWorkspaceId'] ?
                              localStorage['activeWorkspaceId'] : null)
  }

  load(data) {
    this.data = data
  }

  isReady() {
    return this.data !== null
  }

  loadDefault() {
    this.data = {
      1: {
        workspace: "Workspace 1",
        items: [],
      },
    }
    this.activeWorkspaceId = 1
  }

  encrypt(key) {
    const body = JSON.stringify(this.data)
    return aes256.encrypt(key, body)
  }

  decrypt(key, encrypted) {
    const body = aes256.decrypt(key, encrypted)
    this.data = JSON.parse(body)
  }

  workspaces() {
    return Object.keys(this.data)
  }

  workspaceName(workspaceId) {
    return this.data[workspaceId].workspace
  }

  setActiveWorkspace(workspaceId) {
    this.activeWorkspaceId = workspaceId
    localStorage['activeWorkspaceId'] = this.activeWorkspaceId
  }

  setWorkspaceName(workspaceId, name) {
    this.data[workspaceId].workspace = name
  }

  addWorkspace(name) {
    const workspaceId = this._getNextId()
    this.data[workspaceId] = {
      workspace: name,
      items: [],
    }
  }

  removeWorkspace(workspaceId) {
    delete this.data[workspaceId]
  }

  activeItems() {
    return this.data[this.activeWorkspaceId].items
  }

  ensureActiveWorkspace() {
    if (this.activeWorkspaceId === null) {
      this.activeWorkspaceId = (localStorage['activeWorkspaceId'] ?
                                localStorage['activeWorkspaceId'] :
                                Object.keys(this.data)[0])
    }
  }

  _getNextId() {
    if (Object.keys(this.data).length) {
      return Math.max(...Object.keys(this.data)) + 1
    } else {
      return 1
    }
  }
}
