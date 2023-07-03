const nextIndex = (i) => {
  const r = (i + 1) % 6;
  console.log(i, " --> ", r);
};

for (let i = 0; i < 12; i++) {
  nextIndex(i);
}
