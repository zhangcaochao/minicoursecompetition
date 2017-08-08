#!/bin/sh
my_dir=`dirname $0`
zip -r $my_dir/wkds.zip $my_dir -x \*.DS\* \*.git\*   \*archive_and_upload.sh\*
scp $my_dir/wkds.zip plasoftpuser@www.plaso.cn:/plaso/plaso_website/smalltool/wkds/
rm $my_dir/wkds.zip
