<template>
  <div>
    <vsa-list :init-active="initIsTrue">
      <vsa-item>
        <vsa-heading
          ><span class="accordion_heading">{{ heading }}</span>
        </vsa-heading>
        <vsa-icon>
          <span class="open">
            <i class="fa fa-chevron-down"></i>
          </span>
          <span class="close">
            <i class="fa fa-chevron-up"></i>
          </span>
        </vsa-icon>

        <vsa-content><slot name="content"></slot></vsa-content>
      </vsa-item>
    </vsa-list>
  </div>
</template>
<script>
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent,
  VsaIcon,
} from 'vue-simple-accordion'
export default {
  name: 'AppAccordion',
  components: {
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon,
  },
  props: {
    heading: {
      type: String,
      default: '',
    },
    initIsTrue: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
