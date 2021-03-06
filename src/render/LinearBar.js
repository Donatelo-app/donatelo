class LinearBar  {
  constructor(render, data, res) {
    this.render = render;

    this.type = 'linear';
    this.id = data.id || '' + Date.now();

    this.progressImage = new fabric.Image();
    this.standImage = new fabric.Image();

    this.view = new fabric.Group([this.standImage, this.progressImage]);
    
    this.view.setOriginToCenter();
    this.setX(data.x || 500);
    this.setY(data.y || 150);
    this.setSize(data.w || 400, data.h || 50);
    this.setAngle(360-data.angle || 0);
    if(data.value) this.setVarible(data.value);
    else this.setValue(50);

    this.setMaxValue(data.max_value || 100);
    this.setStandImage(res[this.id + ':stand'] || 'assets/white_pixel.png');
    this.setProgressImage(res[this.id + ':bar'] || 'assets/white_pixel.png');
    this.setProgressColor(data.bar_color || '#ded2f7');
    this.setStandColor(data.stand_color || '#fff');
    this.setBorder(data.border || 0);
  }
  getJSON() {
    return {
      images: {
        [this.id + ':stand']: this.standImage._element.src,
        [this.id + ':bar']: this.progressImage._element.src
      },
      data: {
        id: this.id,
        type: "linear",
        value: this.varible || '',
        max_value: +this.maxValue + 0.0000001,
        x: Math.round(this.view.left),
        y: Math.round(this.view.top),
        w: Math.round(this.view.width),
        h: Math.round(this.view.height),
        angle: Math.round(360-this.view.angle),
        stand_color: this.standColor,
        bar_color: this.progressColor,
        border: this.border
      }
    }
  }
  setVarible(id) {
    this.varible = id;
    this.setValue(this.render.getValueFromVarible(id));
  }
  setX(x) {
    this.view.left = x;
    this.render.canvas.renderAll();
  }
  setY(y) {
    this.view.top = y;
    this.render.canvas.renderAll();
  }
  setWidth(w) {
    this.view.setWidth(w);
    this.progressImage.left = -this.view.width/2;
    this.progressImage.setWidth(this.view.width);
    this.standImage.left = -this.view.width/2;
    this.standImage.setWidth(this.view.width);
    this.setBorder(this.border);
    this.setValue(this.value);
  }
  setHeight(h) {
    this.view.setHeight(h);
    this.progressImage.top = -this.view.height/2;
    this.progressImage.setHeight(this.view.height);
    this.standImage.top = -this.view.height/2;
    this.standImage.setHeight(this.view.height);

    this.setBorder(this.border);
    this.setValue(this.value);
  }
  setSize(w, h) {
    this.view.setHeight(h);
    this.view.setWidth(w);
    this.progressImage.top = -this.view.height/2;
    this.progressImage.left = -this.view.width/2;
    this.progressImage.setWidth(this.view.width);
    this.progressImage.setHeight(this.view.height);

    this.standImage.top = -this.view.height/2;
    this.standImage.left = -this.view.width/2;
    this.standImage.setWidth(this.view.width);
    this.standImage.setHeight(this.view.height);

    this.setBorder(this.border);
    this.setValue(this.value);
  }
  setAngle(angle) {
    this.view.angle = angle;
    this.render.canvas.renderAll();
  }
  setProgressImage(url) {
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.progressImage.setElement(img);
      this.setSize(this.view.width, this.view.height);
      this.setProgressColor(this.progressColor);
      this.setValue(this.value);
    }
    img.src = url;
  }
  setStandImage(url) {
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.standImage.setElement(img);
      this.setSize(this.view.width, this.view.height);
      this.setStandColor(this.standColor);
      this.render.canvas.renderAll();
    }
    img.src = url;
  }
  setValue(val) {
    this.value = +val;
    this.progressImage.width = this.view.width/this.maxValue*this.value;
    this.render.canvas.renderAll();
  }
  setMaxValue(max) {
    this.maxValue = +(+max).toFixed(5);
    this.progressImage.width = this.view.width/this.maxValue*this.value;
    this.render.canvas.renderAll();
  }
  setProgressColor(color) {
    this.progressColor = color;
    this.progressImage.filters[0] = new fabric.Image.filters.Tint({color});
    this.progressImage.applyFilters(this.render.canvas.renderAll.bind(this.render.canvas));
  }
  setStandColor(color) {
    this.standColor = color;
    this.standImage.filters[0] = new fabric.Image.filters.Tint({color});
    this.standImage.applyFilters(this.render.canvas.renderAll.bind(this.render.canvas));
  }
  setBorder(br) {
    this.border = +br;
    this.standImage.width = this.view.width+br*2;
    this.standImage.height = this.view.height+br*2;
    this.standImage.left = -this.view.width/2-br;
    this.standImage.top = -this.view.height/2-br;
    this.render.canvas.renderAll();
  }
}

module.exports = LinearBar;
