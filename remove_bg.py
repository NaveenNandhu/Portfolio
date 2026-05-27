from PIL import Image

def remove_black_bg(input_path, output_path, tolerance=30):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    newData = []
    
    for item in datas:
        # Check if pixel is close to black
        if item[0] < tolerance and item[1] < tolerance and item[2] < tolerance:
            # Change all black (also shades of black)
            # to transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_black_bg("public/developer.png", "public/developer-nobg.png")
    print("Background removed successfully.")
