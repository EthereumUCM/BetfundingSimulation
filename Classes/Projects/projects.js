class Project {
  constructor(index, name, difficulty, socialImpact, date) {
    this._index = index;
    this._name = name;
    this._difficulty = difficulty;
    this._socialImpact = socialImpact;
    this._date = date;
    this._verified = false;
    this._description = "difficulty:" + difficulty + ";social_impact:" + socialImpact;
    this._numPosBets = 0;
    this._numNegBets = 0;
    this._amountPosBets = 0;
    this._amountNegBets = 0;
  }

  // Getters and setters of index

  get index() {
    return this._index;
  }

  set index(index) {
    this._name = index;
  }

  // Getters and setters of name

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }


  // Getters and setters of description

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  // Getters and setters of difficulty

  get difficulty() {
    return this._difficulty;
  }

  set difficulty(difficulty) {
    this._difficulty = difficulty;
  }

  // Getters and setters of socialImpact

  get socialImpact() {
    return this._socialImpact;
  }

  set socialImpact(socialImpact) {
    this._socialImpact = socialImpact;
  }

  // Getters and setters of date


  get date() {
    return this._date;
  }

  set date(date) {
    this._date = date;
  }

  // Getters and setters of numPosBets

  get numPosBets() {
    return this._numPosBets;
  }

  set numPosBets(numPosBets) {
    this._numPosBets = numPosBets;
  }

  // Getters and setters of numNegBets

  get numNegBets() {
    return this._numNegBets;
  }

  set numNegBets(numNegBets) {
    this._numNegBets = numNegBets;
  }

  // Getters and setters of amountPosBets

  get amountPosBets() {
    return this._amountPosBets;
  }

  set amountPosBets(amountPosBets) {
    this._amountPosBets = amountPosBets;
  }

  // Getters and setters of amountNegBets

  get amountNegBets() {
    return this._amountNegBets;
  }

  set amountNegBets(amountNegBets) {
    this._amountNegBets = amountNegBets;
  }

  // Getters and setters of verified

  get verified() {
    return this._verified;
  }

  set verified(verified) {
    this._verified = verified;
  }

}
