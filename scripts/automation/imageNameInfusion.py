from PIL import Image, ImageFont, ImageDraw

class ImageNameInfusion:
    def __init__(self, name, imgPath):
        self.name_text = name
        self.imgPath = imgPath
        self.name_font = ImageFont.truetype('../../fonts/Free-Saint-George-Stencil-Font/SaintGeorge-LowercaseStencil.otf', 160)


    def initialiseImage(self):
        self.my_image = Image.open(self.imgPath)
        image_editable = ImageDraw.Draw(self.my_image)
        width, height = self.my_image.size
        return image_editable, width, height

    def getPositions(self, x1, x2, y1, y2, w, h, xfrac, yfrac):
        x = (x2 - x1 - w)*xfrac + x1 + 1
        y = (y2 - y1 - h)*yfrac + y1 + 1
        return x, y

    # Keep the name under 15 characters
    def addName(self):
        image, width, height = self.initialiseImage()
        w, h = image.textsize(self.name_text, font=self.name_font)
        x, y = self.getPositions(0, width, 0, height, w, h, 0.5, 0.8)
        image.text((x, y), self.name_text, (103,186,102), font=self.name_font, align='center')
        self.publishImage()

    def publishImage(self):
        self.my_image.save("../../img/final.png")