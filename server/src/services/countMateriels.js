function countMateriels(data) {
  let inventaire = {};
  data.forEach((item) => {
    const type = item.modele.modele;
    if (inventaire[type]) {
      inventaire[type]++;
    } else {
      inventaire[type] = 1;
    }
  });
  return inventaire;
}

module.exports = { countMateriels };
