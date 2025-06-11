<script setup="setup">
import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import { onMounted } from "vue";

const setupChannelTalk = () => {
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: "652f8e43-1d56-41b7-b594-bd6c8f2bd4e4",
    hidePopup: true,
    hideChannelButtonOnBoot: true,
  });
  ChannelService.hideMessenger();
  ChannelService.hideChannelButton();
  ChannelService.onHideMessenger(() => {
    ChannelService.hideChannelButton();
  });
};

onMounted(() => {
  setupChannelTalk();
});
</script>
<template>
  <div class="fixed z-10 cursor-pointer right-2 bottom-14" @click="ChannelService.openChat()">
    <img src="@/assets/img/banner/inquiry-m.png" alt="icon" class="w-[66px] pc:hidden" />
    <img src="@/assets/img/banner/inquiry-p.png" alt="icon" class="hidden pc:block w-[160px]" />
  </div>
</template>
<style scoped="scoped"></style>
