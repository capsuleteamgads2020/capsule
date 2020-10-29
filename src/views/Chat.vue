<template>
    <div>
        <button type="button" class="comment--image--button"  @click="addFiles($event)">
            <svg viewBox="0 0 24 24" class="comment--image--button--icon">
                <g>
                    <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
                    <circle cx="8.868" cy="8.309" r="1.542"></circle>
                </g>
            </svg>
        </button>
        <label>
            <input type="file" id="files" ref="files" accept="image/*" multiple @change="handleFilesUpload()"/>
        </label>
        <label>
            <!-- <input type="file" id="file" ref="file" accept="image/*" @change="handleFilesUpload()"/> -->
        </label>
        <!-- <div>
            <div class="element" style="width: 20%;">
                <div class="">
                    <router-link class="link--item home" :to="{ name: 'Home' }">
                        <img src="../assets/avatar.jpeg" alt="Avatar" style="border-radius: 9999px; max-height: 4rem; width: 4rem;">
                    </router-link>
                </div>
            </div>
            <div class="element" style="width: 80%;">
                <div class="" style="width: 100%; height: 100%;">
                    <label class="">
                        <textarea class="" name="comment" style="width: 100%;"></textarea>
                    </label>
                </div>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                    Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                    Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                    Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                    Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                    Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                    Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                </p>
            </div>
        </div> -->
        <router-link class="link--item home" :to="{ name: 'Forum' }">Forum</router-link>
        <div class="container">
            <div class="item" style="width: 20%;">
                 <div class="">
                    <router-link class="link--item home" :to="{ name: 'Home' }">
                        <img src="../assets/avatar.jpeg" alt="Avatar" style="border-radius: 9999px; max-height: 4rem; width: 4rem;">
                    </router-link>
                </div>
            </div>
            <div class="item" style="width: 80%;">
                <div class="" style="width: 100%;">
                    <div>
                        <label class="">
                            <textarea class="" name="comment" style="width: 100%;"></textarea>
                        </label>
                    </div>
                    <div>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                            Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                            Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                            Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                            Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                            Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. 
                            Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Chat',
        data() {
            return {
                files: [],
            }
        },
        methods: {
            addFiles() {
                this.$refs.files.click();
            },
            handleFilesUpload(){
                if (this.minimum) {
                    // vet file upload
                    // console.log(this.$refs.files.files.length);
                    if (this.$refs.files.files.length > 4 || (this.files.length + this.$refs.files.files.length) > 4) {
                        this.message = 'Maximum number of 4 files allowed';
                        this.maximum = true;
                        return;
                    }
                    // Get the uploaded files from the input.
                    let uploadedFiles = this.$refs.files.files;
                    // Adds the uploaded file to the files array
                    for( var i = 0; i < uploadedFiles.length; i++ ){
                        this.files.push( uploadedFiles[i] );
                    }
                } else {
                    // vet file upload
                    // console.log(this.$refs.file.files[0].length);
                    if ((this.files.length + 1) > 4) {
                        this.message = 'Maximum number of 4 files allowed';
                        this.maximum = true;
                        return;
                    }
                    // console.log(this.$refs.file.files[0]);
                    this.files.push(this.$refs.file.files[0]);
                }
                // Check if number of uploaded files are less than 3
                this.minimum = this.files.length < 3 ? true : false;
                // Generate image previews for the uploaded files
                this.getImagePreviews();
            },
            // Gets the preview image for the file.
            getImagePreviews(){
                // Iterate over all of the files and generate an image preview for each one.
                for( let i = 0; i < this.files.length; i++ ) {
                    // Ensure the file is an image file
                    if (/\.(jpe?g|png|gif)$/i.test( this.files[i].name )) {
                        // Create a new FileReader object
                        let reader = new FileReader();
                        // Add an event listener for when the file has been loaded to update the src on the file preview.
                        reader.addEventListener("load", function() {
                            this.$refs['image'+parseInt( i )][0].src = reader.result;
                        }.bind(this), false);

                        /*
                        Read the data for the file in through the reader. When it has
                        been loaded, we listen to the event propagated and set the image
                        src to what was loaded from the reader.
                        */
                        reader.readAsDataURL( this.files[i] );
                    }
                }
            },
		
        }
        
    }
</script>

<style scoped>
.element {
	display: inline-block;
	width: 50%;
	/* height: 100px; */
	background-color: #ce8888;
	border: 1px solid #000000;
}
.container {
    display: flex;
}

.item {
    background: #f5f5f5;
	border: 1px solid #000000;
    /* flex-basis: 100%; */
    /* width: 50%; */
    /* height: 100px; */
    margin: 5px;
}
</style>