// QUERY 1 - Display All Patients
db.patients.find()

// QUERY 2 - Find Patients with Diabetes
db.patients.find({
    disease: "Diabetes"
})

// QUERY 3 - Update Patient Age
db.patients.updateOne(
    { patient_id: "P001" },
    { $set: { age: 26 } }
)

// QUERY 4 - Count Total Patients
db.patients.countDocuments()

// QUERY 5 - Count Patients by Disease
db.patients.aggregate([
{
    $group:{
        _id:"$disease",
        totalPatients:{$sum:1}
    }
}
])

// QUERY 6 - Calculate Total Treatment Cost
db.treatments.aggregate([
{
    $group:{
        _id:"$patient_id",
        totalCost:{$sum:"$cost"}
    }
}
])

// QUERY 7 - Count Appointments per Patient
db.appointments.aggregate([
{
    $group:{
        _id:"$patient_id",
        totalAppointments:{$sum:1}
    }
}
])

// QUERY 8 - Patient + Appointment Lookup
db.patients.aggregate([
{
    $lookup:{
        from:"appointments",
        localField:"patient_id",
        foreignField:"patient_id",
        as:"appointments"
    }
}
])

// QUERY 9 - Patient + Treatment Lookup
db.patients.aggregate([
{
    $lookup:{
        from:"treatments",
        localField:"patient_id",
        foreignField:"patient_id",
        as:"treatments"
    }
}
])

// QUERY 10 - Doctor Appointment Ranking
db.appointments.aggregate([
{
    $group:{
        _id:"$doctor_id",
        totalAppointments:{$sum:1}
    }
},
{
    $sort:{totalAppointments:-1}
}
])

// INDEX STRATEGY
db.patients.createIndex({
    disease:1
})

db.patients.getIndexes()
