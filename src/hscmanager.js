export class HscManager {
  constructor(root, appIdString) {
    this.root = root
    this.appIdString = appIdString
    this.hsc = null
    this.api = null
    this.profile = null
    this.block = null
  }

  async initialize() {
    // Load hashstorage-cli
    this.hsc = await import('hashstorage-cli')

    // Create hashstorage api instance
    this.api = this.hsc.Api.new(this.root)

    // Load profile
    try {
      // Load profile from localStorage
      const profile = this.hsc.Profile.load()

      // If profile is valid, keep it
      if (profile.check()) {
        this.profile = profile
      }
      // Otherwise create it in localStorage
      else {
        profile.clear()
      }
    } catch (e) {}
  }

  authorize(username, password) {
    this.profile = this.hsc.Profile.new(this.appIdString, username, password)
    this.profile.save()
  }

  unauthorize() {
    this.profile.clear()
  }

  isAuthorized() {
    return this.profile !== null
  }

  async prepareAppstate(appstate) {
    // Try for get data of appstate, on error create a new default appstate
    try {
      // Request for appdata
      const blockJson = await this.profile.getBlockJson(this.api, "base", "appdata")
      this.block = this.hsc.Block.fromBlockJson(blockJson)

      // Decrypt block to initialize appstate
      appstate.decrypt(this.profile.privateKey(), this.block.data())
    } catch (err) {
      // If block for app data is not found
      if (err.status == 404) {
        // Load default appstate
        appstate.loadDefault()

        // Encrypt the appstate data
        const encrypted = appstate.encrypt(this.profile.privateKey())

        // Create and save block with encrypted appstate data
        this.block = this.hsc.Block.new(this.profile.publicKey(), "base", "appdata")
        this.block.setData(encrypted)
        await this.block.save(this.api, this.profile)
      } else {
        // Else throw unknown error
        throw err
      }
    }

    // Ensure active workspace is set
    appstate.ensureActiveWorkspace()
  }
}
