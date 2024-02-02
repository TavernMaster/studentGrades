import Grade from '../db/models/grade'

async function getStatistic(personalCode) {
	const allGrades = await Grade.findAll({where: {studentPersonalCode: personalCode}})
	const subjects = {}

	allGrades.forEach(gradeDb => {
		const grade = gradeDb.grade

		let subject = subjects[gradeDb.subject]
		if (!subject) subject = subjects[gradeDb.subject] = {grades: [], summGrades: 0, totalGrades: 0}

		subject.subject = gradeDb.subject
		if (!subject.maxGrade || grade > subject.maxGrade) subject.maxGrade = grade
		if (!subject.minGrade || grade < subject.minGrade) subject.minGrade = grade
		subject.summGrades += grade
		subject.totalGrades += 1
		subject.grades.push(grade)
	})

	const data = []

	for (const key in subjects) {
		const subject = subjects[key]
		const avgGrade = +(subject.summGrades / subject.totalGrades).toFixed(2)
		data.push({subject: subject.subject, maxGrade: subject.maxGrade, minGrade: subject.minGrade, avgGrade, totalGrades: subject.totalGrades})
	}

	return data
}

export default getStatistic
