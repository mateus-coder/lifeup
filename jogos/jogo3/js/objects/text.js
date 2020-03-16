function ObjectMessage (props){
    let { y, color, text, x, font, end } = props;
    this.x = x;
    this.y = y;
    this.text = text;
    this.status = "VISIBLE";
    this.font = font;
    this.color = color;
    this.baseline = "top";
    this.end = end;
}