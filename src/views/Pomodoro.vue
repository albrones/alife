<template>
    <div class="pomodoro">
        <h1>Pomodoro</h1>
        <a
            href="https://francescocirillo.com/pages/pomodoro-technique"
            target="blank"
            rel="noopener noreferrer"
        >
            Qu'est ce que c'est ?
        </a>
        <div class="pomodoro-content" v-if="isLoaded">
            <div>
                <Button @click.native="startTimer('15')">Start</Button>
                <!-- //timex100 -->
                <div><span id="time"></span></div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@/components/ui/Button'

export default {
    name: 'Pomodoro',
    components: {
        Button,
    },
    data() {
        return {
            isLoaded: false,
            workingTime: true,
        }
    },
    mounted() {
        this.isLoaded = true
    },
    computed: {},
    methods: {
        startTimer(duration) {
            //TODO: Save state in store
            const display = document.querySelector('#time')
            const start = Date.now()
            let diff = 0,
                minutes = 0,
                seconds = 0,
                intervalID = null

            function timer() {
                // get the number of seconds that have elapsed since
                // startTimer() was called

                diff = duration - (((Date.now() - start) / 1000) | 0)

                // does the same job as parseInt truncates the float
                minutes = (diff / 60) | 0
                seconds = diff % 60 | 0

                minutes = minutes < 10 ? '0' + minutes : minutes
                seconds = seconds < 10 ? '0' + seconds : seconds

                display.textContent = minutes + ':' + seconds

                if (diff <= 0) {
                    // add one second so that the count down starts at the full duration
                    // example 05:00 not 04:59
                    // start = Date.now() + 1000
                    this.loopingGesture(intervalID)
                }
            }
            // we don't want to wait a full second before the timer starts
            timer()
            intervalID = setInterval(timer.bind(this), 1000)
        },
        loopingGesture(intervalID) {
            // Looping between Work & Break time
            if (this.workingTime === true) {
                //TODO: externalize switch timer work/break gesture
                const response = !confirm(
                    "Time's up ! It's time to take a break !"
                )

                // display.focus()
                if (response === false) {
                    this.startTimer('3') //timex100
                    this.workingTime = false
                }
            } else {
                //TODO: externalize switch timer work/break gesture
                const response = confirm(
                    "Time's up ! Go back to work actively!"
                )

                // display.focus()
                if (response === true) {
                    this.startTimer('15') //timex100
                    this.workingTime = true
                }
            }
            clearInterval(intervalID)
        },
    },
}
</script>

<style lang="scss" scoped>
.pomodoro-content {
    margin: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>
