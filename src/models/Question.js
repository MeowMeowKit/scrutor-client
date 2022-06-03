export default class Question {
	constructor(questionId, content, type, difficulty, teacherId, options, tags) {
		this.questionId = questionId;
		this.content = content;
		this.type = type;
		this.difficulty = difficulty;
		this.teacherId = teacherId;
		this.options = options;
		this.tags = tags;
	}
}
