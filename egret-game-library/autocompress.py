#!/bin/bash/python
#-*- coding:utf8 -*-

import os
import sys
import os.path
import shutil
import argparse
#from PIL import Image

try:
    import tinify
except:
    print("Error: import tinify  安装依赖库命令：pip install --upgrade tinify")
    sys.exit()

try:
    from pydub import AudioSegment
except:
    help = '''Error: import pydub  安装依赖库命令如下：
ffmpeg: brew install ffmpeg --with-libvorbis --with-ffplay --with-theora
pydub : pip install pydub
    '''
    print(help)
    sys.exit()


'''
tinify也可压缩jpg，png格式图片，压缩的比较多,但是很慢
而且有压缩次数限制，必须使用申请的key，不过压缩出来的图片比较小
这个key要在https://tinypng.com/developers 用邮箱注册后免费获取
'''
tinify.key = "P6NcB6P0ZbDWyL8Ylp2X7jrH-UKIbRcy"

#----------------------common--------------------
#资源文件目录
GlobalResourceDir = ["loading","playlist","joinroom","shop","club"]
#找到的所有待处理文件
GlobalSearchFile = {}
#当前已处理的文件个数
GlobalDealFileCount = 0
#查找到的指定文件个数
GlobalFindFileCount = 0
#当前所在目录
GlobalCWD = os.path.dirname(os.path.abspath(__file__))
#----------------------common--------------------


#----------------------Image--------------------
#压缩图像质量百分比
GlobalImageQuality = 80
#需要处理的图片资源后缀名集合
GlobalImageFilterName = ['jpg', 'png', 'jpeg']
#----------------------Image--------------------


#----------------------Audio--------------------
#需要处理的音频资源后缀名集合
GlobalAudioFilterName = ['mp3', 'wav']
#音频比特率,人类最低能听到20k,默认为44.1k，压缩到30k可以的
GlobalAudioBitRate = '30k'
#----------------------Audio--------------------

def startCompress(switch, global_filter_name):
    '''开始处理'''
    global GlobalImageFilterName, GlobalAudioFilterName, GlobalResourceDir, GlobalFindFileCount, GlobalDealFileCount

    if switch :
        resource_name = "图片"
        compress = image_compress
    else:
        resource_name = "音频"
        compress = audio_compress

    for path in GlobalResourceDir:
        temp_dir = os.path.join(GlobalCWD, path)
        if not os.path.exists(temp_dir):
            print("Error: 当前目录下没有找到指定的资源目录, 当前目录：%s, 指定资源目录：%s" % (GlobalCWD, 'mahjong/min/%s'%path))
            return
        else:
            print("检测%s目录 %s 成功，准备开始压缩" % (resource_name, temp_dir))
            search(temp_dir, global_filter_name)
            for path in GlobalSearchFile.keys():
                GlobalFindFileCount += 1
                compress(path, resource_name)
    print("压缩完成，查找到%s文件个数：%d, 已压缩%s文件个数：%d\n\n" % (resource_name, GlobalFindFileCount, resource_name, GlobalDealFileCount))

def image_compress(path, resource_name):
    '''压缩图像文件'''
    global GlobalImageQuality, GlobalDealFileCount
    try:
        print("当前压缩%s资源: %s"%(resource_name, path))
        #img = Image.open(path)
        img = tinify.from_file(path)
    except IOError:
        print("Error: 打开文件失败,文件名：%s" % path)
    except KeyboardInterrupt:
        print("压缩已终止……")
        sys.exit()
    else:
        GlobalDealFileCount += 1
        #img.save(path, quality=GlobalImageQuality)
        img.to_file(path)

def audio_compress(path, resource_name):
    '''压缩音频文件'''
    global GlobalAudioBitRate, GlobalDealFileCount
    try:
        print("当前压缩%s资源：%s"%(resource_name, path))
        file_ext_name = path.rsplit('.',1)[1]
        audio = AudioSegment.from_file(path, format=file_ext_name)
    except IOError:
        print("Error: 打开文件失败,文件名：%s" % path)
    except KeyboardInterrupt:
        print("压缩已终止……")
        sys.exit()
    else:
        GlobalDealFileCount += 1
        audio.export(path, format=file_ext_name, bitrate=GlobalAudioBitRate)

def build_new_file_path(path, flag):
    '''构造新文件路径'''
    temp = path.rsplit('.',1)
    path = temp[0] + flag + temp[1]
    return path

def back_up_file(src):
    '''备份文件'''
    dst = src + '.bk'
    shutil.copy2(src, dst)

def search(path,name):
    '''递归搜索指定的文件后缀名'''
    global GlobalSearchFile
    for filename in os.listdir(path):
        fp = os.path.join(path, filename)
        temp = fp.split('.')
        if os.path.isfile(fp) and (temp[len(temp)-1] in name):
            print ("查找到:%s"%fp)
            GlobalSearchFile[fp] = True
        elif os.path.isdir(fp):
            search(fp, name)

def main():
    print("当前目录：%s" % GlobalCWD)
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--image', action='store_true', default=False, help="压缩图片资源")
    parser.add_argument('-a', '--audio', action='store_true', default=False, help="压缩音频资源")
    argp = parser.parse_args()
    #压缩图片
    if argp.image :
        startCompress(True, GlobalImageFilterName)
    #压缩音频
    if argp.audio :
        startCompress(False, GlobalAudioFilterName)

    if not argp.image and not argp.audio :
        help = '''Error:  请指定需要解压的类型(图片[-i,--image], 音频[-a,--autio]) 命令如下：
        压缩图片：python %s -i 
        压缩音频：python %s -a 
        压缩所有: python %s -i -a
        ''' %(parser.prog, parser.prog, parser.prog)
        print(help)

if __name__ == '__main__':
    main()
