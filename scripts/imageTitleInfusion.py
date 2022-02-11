from PIL import Image, ImageFont, ImageDraw

class ImageTitleInfusion:
    def __init__(self, imgPath) -> None:
        self.imgPath = imgPath
        self.my_image = Image.open(self.imgPath)
        self.width, self.height = self.my_image.size
        self.image_editable = ImageDraw.Draw(self.my_image)
        self.title_font = ImageFont.truetype('../fonts/BLANKA Font/Blanka-Regular.otf', 180)
        # Customise your title here
        self.title_text = "TITLE"

    def getPositions(self, xfrac, yfrac):
        x = (self.width - self.w)*xfrac
        y = (self.height - self.h)*yfrac
        return x, y

    def addTitle(self):
        self.w, self.h = self.image_editable.textsize(self.title_text, font=self.title_font)
        x, y = self.getPositions(0.5, 0.1)
        self.image_editable.text((x, y), self.title_text, (237, 230, 211), font=self.title_font, align='center')
        self.addGradient()
        self.publishImage()

    def publishImage(self):
        self.my_image.save("../img/result.jpg")

    def addGradient(self):
        def interpolate(f_co, t_co, interval):
            det_co =[(t - f) / interval for f , t in zip(f_co, t_co)]
            for i in range(interval):
                yield [round(f + det * i) for f, det in zip(f_co, det_co)]
        imgsize=(self.w,self.h)
        gradient = Image.new('RGBA', imgsize, color=0)
        draw = ImageDraw.Draw(gradient)
        f_co = (45,92,76)
        t_co = (255,0,0)
        for i, color in enumerate(interpolate(f_co, t_co, gradient.height * 2)):
            draw.line([(0, i), (gradient.width, i)], tuple(color), width=1)
        first = False
        x, y = 0, 0
        for i in range(self.width):
            for j in range(self.height):
                k = self.my_image.getpixel((i, j))
                if k == (237, 230, 211):
                    if not first:
                        x, y = i, j
                        first = True
                    self.my_image.putpixel((i, j), gradient.getpixel((i-x, j-y)))