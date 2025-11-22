const city = {
  semen: ["dedebit", "yekatit", "meles", "mesfin", "industry"],
  hawelti: ["adi_shmdhun", "momona", "hayelom", "hidassie", "selam"],
  ayder: ["sertse", "gunbot 20", "marta", "adi ha", "may_dhan"],
  adi_haki: ["hayelom", "amora", "woyane", "hidassie", "debre"],
  hadnet: ["metkel", "smret", "werie", "aynalem", "debre"],
  kedemay_woyane: ["selam", "hareya", "walta", "zeslasse"],
  kuiha: ["abraha", "asmelash", "may_tsedo"],
};

export function get_sub_city(){
  return Object.keys(city);
}

export function get_kebele(sub_city){
  return city[sub_city];
}