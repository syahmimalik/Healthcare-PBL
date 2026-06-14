// Query 1
db.patients.find()

// Query 2
db.patients.find({
  disease:"Diabetes"
})

// Query 3
db.patients.updateOne(
  { patient_id:"P001" },
  { $set:{ age:26 } }
)
