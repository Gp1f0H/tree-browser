export default {
  getData() {
    return fetch(`https://storage.growfood.pro/s1/gf_data/configs/vcp.json `, {
      method: "GET"
    }).then(r => {
      return r.json()
    })
  }
}
